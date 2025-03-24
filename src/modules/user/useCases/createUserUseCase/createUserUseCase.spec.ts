import { compare } from "bcrypt"
import { UserRepositoryInMemory } from "../../repositories/UserRepositoryInMemory"
import { CreateUserUseCase } from "./createUserUseCase"

let createUserUseCase: CreateUserUseCase
let userRepositoryInMemory: UserRepositoryInMemory

describe("CreateUser", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory()
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    })

    it("Should be able to create user with password encrypted", async () => {
        const userPasswordWithoutEncryption = '12345'

        const user = await createUserUseCase.execute({
            email: "gabriel@gmail.com",
            name: "Gabriel",
            password: userPasswordWithoutEncryption,
        })

        const userHasPasswordEncrypted = await compare(userPasswordWithoutEncryption, user.password)

        expect(userHasPasswordEncrypted).toBeTruthy()
    })
})