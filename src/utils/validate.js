export function validateForm(values) {
  const errors = {}
  if (!values.salesId.trim()) errors.salesId = 'Sales ID is required.'
  if (!values.customerName.trim()) errors.customerName = 'Customer Name is required.'
  if (!values.phone.trim()) {
    errors.phone = 'Phone Number is required.'
  } else if (!/^[0-9+\-\s()]{7,20}$/.test(values.phone.trim())) {
    errors.phone = 'Enter a valid phone number.'
  }
  if (!values.source) errors.source = 'Please select a Source.'
  if (values.source === 'Marketing Activity' && !values.marketingProgram.trim()) {
    errors.marketingProgram = 'Please specify the marketing activity program.'
  }
  if (values.ktpNumber && !/^\d{16}$/.test(values.ktpNumber.replace(/\s/g, ''))) {
    errors.ktpNumber = 'KTP Number must be exactly 16 digits.'
  }
  if (values.birthdate) {
    const d = new Date(values.birthdate)
    if (isNaN(d.getTime()) || d > new Date()) errors.birthdate = 'Enter a valid birthdate.'
  }
  return errors
}
