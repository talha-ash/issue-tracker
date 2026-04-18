import {expect, it, describe} from "vitest"
import {validateLoginFormData} from "../service"
import { LoginInput } from "../types.js"

describe("Test validateLoginFormData Function", ()=>{
  it("with valid email and password", ()=>{
    const inputData:LoginInput = {email: "john@gmail.com",password: "password12345"}
    const result = validateLoginFormData(inputData)

    expect(result.isOk()).toBe(true);
  })
})


