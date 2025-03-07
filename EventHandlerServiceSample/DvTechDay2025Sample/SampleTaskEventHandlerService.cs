using System;
using System.Collections.Generic;
using DocsVision.BackOffice.ObjectModel;
using DocsVision.BackOffice.ObjectModel.Services;
using DocsVision.BackOffice.ObjectModel.Services.Entities;

namespace DvTechDay2025Sample
{
    public class TimerEventArgs : EventServiceEventArgs
    {
        public DateTime TargetTime { get; set; }
    }

    [ResDescription("SampleEventHandler")]
    public class SampleTaskEventHandlerService : MessagesEventHandlerService //EventHandlerService
    {
        private static Guid ServiceId = new Guid("DEC99A3D-7038-495C-84F1-D37F6DEC0F93");
        private static Guid TimerElapsedEventId = new Guid("333475D8-4E58-4F03-A521-E8AA503C66F0");

        private readonly Dictionary<Guid, EventHandlerInfo> handlersInfo = new Dictionary<Guid, EventHandlerInfo>
        {
            {
                BaseCard.StateChangedEvent.Id,
                new EventHandlerInfo
                    { EventId = BaseCard.StateChangedEvent.Id, EventArgsType = typeof(OnStateChangedEventArgs), EventHandlerName = nameof(OnCardStateChanged) }
            },
            {
                TimerElapsedEventId,
                new EventHandlerInfo
                    { EventId = TimerElapsedEventId, EventArgsType = typeof(TimerEventArgs), EventHandlerName = nameof(OnTimerElapsedEvent) }
            },
        };

        protected override IDictionary<Guid, EventHandlerInfo> GetHandlersInfo() => handlersInfo;

        protected override Guid GetId() => ServiceId;

        protected override Type GetTargetObjectType() => typeof(Task);

        protected ITaskService TaskService => Context.GetService<ITaskService>();

        public void OnCardStateChanged(Task task, OnStateChangedEventArgs eventArgs)
        {
            try
            {
                if (eventArgs.BuiltInStateId == Task.StartedState.Id)
                    OnTaskStart(task, eventArgs.CardId);
            }
            catch (CardsLockedException ex)
            {
                foreach (BaseCard baseCard in ex.Cards)
                    RegisterForUnlock(baseCard.GetObjectId());
                Context.AcceptChanges();
            }
        }

        public void OnTaskStart(Task task, Guid taskId)
        {
            DateTime elapsedTime = DateTime.Now.AddMinutes(1);

            EventService.RaiseDelayedEvent<TimerEventArgs>(task, TimerElapsedEventId
                , new TimerEventArgs { CardId = taskId, TargetTime = elapsedTime }, elapsedTime);

            Context.AcceptChanges();
        }
        public void OnTimerElapsedEvent(Task task, TimerEventArgs timerEventArgs)
        {
            if (task.SystemInfo.State.BuiltInState != Task.CompletedState.Id)
            {
                foreach (var taskPerformer in task.CurrentPerformers)
                {
                    MailNotificationInfo notificationInfo =
                        TaskService.GetTaskStartMailNotificationInfo(task, taskPerformer.Employee
                        , NotificationManager.GetCardUrl(task, taskPerformer.Employee));

                    NotificationEventArgs notificationEventArgs = new NotificationEventArgs
                    {
                        Recipient = notificationInfo.Email,
                        Subject = "Не забудь заказать котику корм!!!",
                        Body = notificationInfo.Body
                    };

                    PrepareMailMessage(notificationEventArgs);
                }
            }
        }

    }
}
