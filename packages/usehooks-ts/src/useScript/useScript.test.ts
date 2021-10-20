import * as useScript from "./useScript"
// @ponicode
describe("useScript.default", () => {
    test("0", () => {
        let callFunction: any = () => {
            useScript.default("http://placeimg.com/640/480")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            useScript.default("")
        }
    
        expect(callFunction).not.toThrow()
    })
})
