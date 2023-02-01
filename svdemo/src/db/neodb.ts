import  v1  from "neo4j-driver";


import * as dotenv from "dotenv";
dotenv.config();

const neo4j = v1;

export const neo4jSession = () => {
  const driver = neo4j.driver(
    `bolt://${process.env.NEO4J_HOST}:${process.env.NEO4J_PORT}`,
    neo4j.auth.basic(process.env.NEO4J_USERNAME as string, process.env.NEO4J_PASSWORD as string)
  );

  return driver.session();
};

