# Please delete this file after reading!
## Explaination of hook
`useFormValue` only return value `input` and `select` tags. I won't re-render component on change in `input` or `select` field.
`name` attribute is compulsary.

## Usage

Usage is simple, 
```
const formRef = React.useRef() as React.MutableRefObject<HTMLFormElement>
const onSubmit = () =>{
  const value  = useFormState(formRef);
  console.log(value) 
}
return (
  <form onSubmit={onSubmit} ref={formRef} >
    <input type="text" name="lang" /> // If I type `Typescript`
    <button type="submit" >Submit</button>
  </form>
  );
```

**Console:**
```
{
  lang: "Typescript"
}
```

Hook should be inside `onSubmit` function, 
```
const onSubmit = (e: React.FormEvent) => {
  const value  = useFormState(formRef)
  console.log(value)
  e.preventDefault();
};
```
I already mention above, It won't **re-render**, If we try,
```
const formRef = React.useRef() as React.MutableRefObject<HTMLFormElement>
const value  = useFormState(formRef);
console.log(value);
return (
  <form ref={formRef}>
    <input type="text" />
  </form>
  );
```

**Console:**
```
{}
```
You can also add **re-rending** feature But I need this to return only value and shouldn't **re-render** onchange because
This may cause some performance issues.

I am not good in Testing in React, So I had't add `.test.ts` file.
