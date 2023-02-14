import * as mssql from "mssql";
import { mssqlConnection } from "./db/mssqldb";
async function getStarCustomInfo(starId: string): Promise<{GivenName:string|undefined,Username:string|undefined}> {
    const connection = await mssqlConnection();
    const request = await new mssql.Request(connection)
        .input("StarId", mssql.VarChar(50), starId)
        .query(
        "SELECT ds.GivenName,u.Username FROM DiscoveredStars ds INNER JOIN Users u ON ds.UserId = u.Id WHERE @StarId=ds.Id"
    );
    console.log("custom info:"+request.recordset);
    console.log(request.recordset);
    if(request)
        return request.recordset[0];
    return {GivenName:undefined,Username:undefined};
}

async function addStarToDiscoveries(username:string,designatedName:string,givenName:string,starId:string) {
    console.log("dobavamq zvezda");
    const connection = await mssqlConnection();
    console.log(starId);
    const sqlReq = new mssql.Request(connection)
      .input('Username',username)
      .input('StarName',designatedName)
      .input('GivenName',givenName)
      .input('Id',starId)
      .execute("InsertStar");
}

export { getStarCustomInfo,addStarToDiscoveries };