function useOnBackButtonClicked(): [number, () => number] {
const value = 2
const method = () => 2

return [value, method]
}

export default useOnBackButtonClicked
