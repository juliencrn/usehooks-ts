import { useForm } from '..'

type FormData = {
  username: string
  pet: string
  interest: string
  contact: string
}

const checkboxs = ['coding', 'music']
const radios = ['email', 'phone', 'whatsapp']
const options = ['Dog', 'Cat', 'Hamster', 'Parrot']

export default function Component() {
  const { formState, register, onSubmit } = useForm<FormData>()

  const handleSubmit = (formdata: FormData) => {
    console.log({ formdata })
  }

  console.log({ formState }) //-> {formdata: FormData, errors: FormData /**if any */}
  
  // remember to pass the `noValidate` attribute to the form; to turn off the browser's error message style.
  return (
    <form
      noValidate
      style={{ display: 'flex', flexDirection: 'column' }}
      onSubmit={onSubmit(handleSubmit)}
    >
      {/* text */}
      <div>
        <label>
          Enter username:
          <input {...register('username', { type: 'text', required: true, isControlled: true })} />
        </label>
      </div>
      {/* radio input with custom error message */}
      <fieldset>
        <legend>Choose your prefered contact method</legend>
        <div>
          {radios.map(radio => (
            <label key={radio}>
              <input
                {...register('contact', {
                  type: 'radio',
                  required: true,
                  isControlled: true,
                  /** you can pass custom error message */
                  errorMsg: 'You need to choose your contact, Sir!',
                  value: radio,
                })}
              />
              {radio.toUpperCase()}
            </label>
          ))}
        </div>
      </fieldset>
      {/* uncontrolled checkbox */}
      <fieldset>
        <legend>Choose your interests</legend>
        <div>
          {checkboxs.map(checkbox => (
            <label key={checkbox}>
              <input
                {...register('interest', {
                  type: 'checkbox',
                  value: checkbox,
                })}
              />
            </label>
          ))}
        </div>
      </fieldset>
      {/* select */}
      <label htmlFor="pet-select">Choose a pet:</label>
      <select
        {...register('pet', {
          id: 'pet-select',
          required: true,
          isControlled: true,
        })}
      >
        <option value="">--choose an option--</option>
        {options.map(option => (
          <option key={option} value={option}>
            {option.toUpperCase()}
          </option>
        ))}
      </select>
    </form>
  )
}
