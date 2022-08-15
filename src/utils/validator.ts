export function validateEmail(email: string) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

function validPhone(val: string) {
  let numbers = 0
  for (let i = 0; i < val.length; i += 1) {
    if (val[i] >= '0' && val <= '9') numbers += 1
  }
  return numbers === 10
}

export const InputValidate = function (data: any) {
  let error = ''
  const { value = '', inputType, visible = true, required = false, disabled = false, allowDefaultOption } = data
  if (!visible) return ''
  if (disabled) return ''
  if (!required) return ''
  if (value === null || value.toString().length === 0) error = 'Required field'
  if (inputType.toLowerCase() === 'select') {
    if (value === '0') {
      if (allowDefaultOption) error = ''
      else error = 'Required field'
    }
  }
  if (error.length > 0) return error
  try {
    switch (data.type) {
      case 'email':
        if (!validateEmail(data.value)) {
          error = 'Email address is not in a valid format.'
        }
        break
      case 'phone':
        if (!validPhone(data.value)) {
          error = 'Phone Number must be 10 digits.'
        }
        break
    }
  } catch {}
  return error
}
