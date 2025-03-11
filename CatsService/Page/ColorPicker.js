export function ColorPicker(props) {
    const { required, id: fieldName, value = "" } = props;
    const services = useContext(ServicesContext);
    const {resetField, control} = useCustomFormContext();
    const {
        field,
        fieldState: { isDirty, error }
    } = useController({
        name: fieldName,
        control: control,
        rules: { required: required },
        defaultValue: value
    });


    return (
        <EditorContainer isChanged={isDirty} resetValue={() => resetField(fieldName, {defaultValue: value})} {...props}>
            <TextField variant="outlined" size="small" type="color" fullWidth {...field} inputProps={{"data-testid": "text-input"}} style={{width: "400px"}} />
            {error && <ErrorMessage message={services.resources.Dialog_ValidationRequired} />}
        </EditorContainer>
    );
}

export default {
    name: "Cat service extension",
    version: "1.0",
    editors: () => [{ name: "ColorPicker", component: ColorPicker }]
};
