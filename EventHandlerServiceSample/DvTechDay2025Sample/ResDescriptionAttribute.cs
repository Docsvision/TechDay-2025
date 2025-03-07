using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Resources;
using System.Text;
using System.Threading.Tasks;

namespace DvTechDay2025Sample
{
    /// <summary>
    /// Localizable description attribute
    /// </summary>
    [AttributeUsage(AttributeTargets.All)]
    internal sealed class ResDescriptionAttribute : DescriptionAttribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ResDescriptionAttribute"/> class
        /// </summary>
        public ResDescriptionAttribute(string description)
            : base(description)
        {
        }

        /// <summary>
        /// Returns the description stored in this attribute
        /// </summary>
        public override string Description
        {
            get
            {
                string s = Resources.ResourceManager.GetString("Description_" + base.DescriptionValue);
                return (s != null ? s : string.Empty);
            }
        }
    }
}
