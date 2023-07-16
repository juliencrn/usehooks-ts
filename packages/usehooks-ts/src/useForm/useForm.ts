import * as React from 'react'

type Elem = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
type Config =
  | React.InputHTMLAttributes<Elem>
  | React.TextareaHTMLAttributes<Elem>
type CustomConfig = {
  errorMsg?: string
  isControlled?: boolean
  type?: React.InputHTMLAttributes<HTMLInputElement>['type']
  ref?: React.LegacyRef<Elem>
} & Config
type Options<T> = {
  defaultValues: T
}
type Handler<P> = (data: P) => unknown
type FormSubmit = React.FormEventHandler<HTMLFormElement>
type CustomSubmit<T> = (cb: Handler<T>) => FormSubmit
type State<U> = { formdata: U; errors: U }
type Action<A> =
  | {
      type: 'formdata' | 'errors'
      payload: Partial<A>
    }
  | { type: 'reset'; payload?: (data: A) => A }
// export the type in case the function `register` is being passed down the component tree
export type Register = (name: string, config: CustomConfig) => Config

export function useForm<T extends { [k in keyof T]: string }>(
  options?: Options<T>,
) {
  const customErrorRef = React.useRef({} as T)
  const initialState = {
    formdata: { ...options?.defaultValues } as T,
    errors: {} as T,
  }
  const [formState, dispatch] = React.useReducer(reducer, initialState)

  /** function that runs on input's change event */
  const onChange = React.useCallback(
    (e: React.ChangeEvent<Elem>) => {
      dispatch({
        type: 'formdata',
        payload: { [e.target.name]: e.target.value } as T,
      })
      const control = e.target

      if (
        control.validity.valid &&
        formState.errors[e.target.name as keyof T]
      ) {
        // in case the control is valid, then empty the error message
        dispatch({
          type: 'errors',
          payload: { [e.target.name]: '' } as Partial<T>,
        })
      } else {
        dispatch({
          type: 'errors',
          payload: {
            [e.target.name]: e.target.validationMessage,
          } as Partial<T>,
        })
      }
    },
    [formState.errors],
  )

  /** function to register your component into the hook */
  const register: Register = React.useCallback(
    (name, config) => {
      const { errorMsg, isControlled, ...rules } = config
      const isCheckboxOrRadio =
        config.type === 'radio' || config.type === 'checkbox'

      if (!(name in formState.formdata)) {
        const payload = { [name]: '' } as T
        dispatch({ type: 'formdata', payload })
      }

      if (errorMsg) {
        //@ts-ignore :ts is shouting on the type of k
        customErrorRef.current[name] = errorMsg
      }

      if (!isControlled) {
        return { ...rules, name }
      }

      return {
        ...rules,
        name,
        value: isCheckboxOrRadio
          ? config.value
          : formState.formdata[name as keyof T],
        onChange: e => {
          onChange(e)
          config.onChange?.(e)
        },
      }
    },
    [onChange, formState],
  )

  /** function that runs on form submission */
  const onSubmit: CustomSubmit<T> = React.useCallback(
    handler => {
      return e => {
        e.preventDefault()
        e.stopPropagation()

        const form = e.currentTarget
        const controls = form.elements

        for (const k in formState.formdata) {
          // handle the errors state here

          const control = controls.namedItem(k) as Elem | RadioNodeList

          if (control instanceof RadioNodeList) {
            const item = control.item(0) as Elem
            if (item.validity && !item.validity.valid) {
              dispatch({
                type: 'errors',
                payload: {
                  [k]: customErrorRef.current[k] ?? item.validationMessage,
                } as unknown as Partial<T>,
              })
            }

            continue
          }

          if (control.validity && !control.validity.valid) {
            dispatch({
              type: 'errors',
              payload: {
                [k]: customErrorRef.current[k] ?? control.validationMessage,
              } as unknown as Partial<T>,
            })
          }
        }

        // console.log({ "form checkValidity": form.checkValidity() });

        // call the `hanlder` if, and only if there's no error.
        if (form.checkValidity()) handler(formState.formdata)
      }
    },
    [formState.formdata],
  )

  /** function that resets form values */
  const reset = React.useCallback((cb?: (args: T) => T) => {
    dispatch({ type: 'reset', payload: cb })
  }, [])

  /** keep state logic separate */
  function reducer(state: State<T>, action: Action<T>): State<T> {
    const resetState = { formdata: {}, errors: {} } as typeof state

    if (action.type === 'reset') {
      // handle reset
      for (const k in state.formdata) {
        //@ts-ignore : ts is yelling at the type of `k`;
        resetState.formdata[k] = ''
      }
      resetState['errors'] = {} as T
    }
    // in case the user provides a callback to reset `formdata` in more custom way,
    // then invert the control.
    if (action.type === 'reset' && action.payload instanceof Function) {
      resetState.formdata = action.payload(resetState.formdata)
    }

    return (
      {
        formdata: {
          ...state,
          formdata: { ...state.formdata, ...action.payload },
        },
        errors: { ...state, errors: { ...state.errors, ...action.payload } },
        reset: resetState,
      }[action.type] ?? state
    )
  }

  return { formState, onSubmit, register, reset, dispatch }
}
