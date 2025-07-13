import { useUniqueId } from './useUniqueId'


function MyComponent() {
  const id = useUniqueId();

  return (
    <div>
      <label htmlFor={id}>Enter your name:</label>
      <input id={id} type="text" />
    </div>
  );
}


const id = useUniqueId();
// → "b1a9dba3bc934b6a84b1cc98b4feab1a"

const prefixedId = useUniqueId({ prefix: 'user-' });
// → "user-b1a9dba3bc934b6a84b1cc98b4feab1a"

const dashedId = useUniqueId({ withDashes: true });
// → "3cb742e6-96bb-4684-b9ea-7e46a5dfb324"

const shortIdWithPrefix = useUniqueId({ prefix: 'btn-', length: 10 });
// → "btn-f2e1cb42a1"

const shortId = useUniqueId({ length: 10 });
// "3fc7e2a9c1"

