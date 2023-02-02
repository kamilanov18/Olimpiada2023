import { mssqlConnection } from "../../src/db/mssqldb";
import { ConnectionPool, Request } from "mssql";

describe("mssqlConnection", () => {
  it("should return a valid connection", async () => {
    const connection = await mssqlConnection();
    console.log(connection);
    expect(connection).toBeInstanceOf(ConnectionPool);
  });
});
describe("InsertUser procedure", () => {
  let connection: ConnectionPool;

  beforeAll(async () => {
    connection = await mssqlConnection();
  });

  afterAll(async () => {
    connection.close();
  });

  it("should insert a user in the database", async () => {
    const request = new Request(connection);
    const username = "test-user";
    const email = "test@example.com";
    const password = "test-password";
    const firstName = "Test";
    const lastName = "User";

    const result = await request
      .input("Username", username)
      .input("Email", email)
      .input("Password", password)
      .input("FirstName", firstName)
      .input("LastName", lastName)
      .execute("InsertUser");

    expect(result.returnValue).toEqual(0);

    const selectRequest = new Request(connection);
    const selectResult = await selectRequest
      .input("Username", username)
      .query("SELECT * FROM Users WHERE Username = @Username");

    expect(selectResult.recordset[0].Username).toEqual(username);
    expect(selectResult.recordset[0].Email).toEqual(email);
    //expect(selectResult.recordset[0].Password).toEqual(password);
    expect(selectResult.recordset[0].FirstName).toEqual(firstName);
    expect(selectResult.recordset[0].LastName).toEqual(lastName);
    const deleteRequest= new Request(connection);
    const deleteResult = await deleteRequest
      .input("Username", username)
      .query("DELETE FROM Users WHERE Username = @Username");
  });
});
