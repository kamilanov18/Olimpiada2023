import { neo4jSession } from "../../src/db/neodb";
import { Driver, Session } from "neo4j-driver";
describe("neo4jSession", () => {
    let driver:Driver;

    let person1Name :string;
    let person2Name :string;

    let personName:string;

beforeAll(async () => {
         person1Name = 'Alice';
         person2Name = 'David';
         personName = 'Alice';
         driver = await neo4jSession();
      });
    
      afterAll(async () => {
        driver.close();
      });


    it("should return a valid session", async () => {
    const session = await driver.session();
    expect(session).toBeInstanceOf(Session);
    session.close();
    });

    

    it("should be able to create simple graph", async () => {
       
        const session = driver.session({ database: 'neo4j' });

        try {
            const writeQuery = `MERGE (p1:Person { name: $person1Name })
                                MERGE (p2:Person { name: $person2Name })
                                MERGE (p1)-[:KNOWS]->(p2)
                                RETURN p1, p2`;

            // Write transactions allow the driver to handle retries and transient errors.
            const writeResult = await session.executeWrite(tx =>
                tx.run(writeQuery, { person1Name, person2Name })
            );

            // Check the write results.
            writeResult.records.forEach(record => {
                const person1Node = record.get('p1');
                const person2Node = record.get('p2');
                console.info(`Created friendship between: ${person1Node.properties.name}, ${person2Node.properties.name}`);
                expect(person1Node.properties.name).toEqual(person1Name);
                expect(person2Node.properties.name).toEqual(person2Name);
            
            });

        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        } finally {
            // Close down the session if you're not using it anymore.
            await session.close();
        }
    
    });

    it("should be able to search data in graph", async () => {
       
        const session = driver.session({ database: 'neo4j' });

        try {
            const readQuery = `MATCH (p:Person)
                            WHERE p.name = $personName
                            RETURN p.name AS name`;
            
            const readResult = await session.executeRead(tx =>
                tx.run(readQuery, { personName })
            );

            readResult.records.forEach(record => {
                console.log(`Found person: ${record.get('name')}`)
                expect(record.get('name')).toEqual(personName);
            });
        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        } finally {
            await session.close();
        }
    
    });

    it("should be able to delete the created graph", async () => {
        
        async function deleteGraph(personName:string){
            
            const session = driver.session({ database: 'neo4j' });
            try {
            const deleteQuery = `MATCH (p1:Person { name: $personName })
                                DETACH DELETE p1`;
        
            const deleteResult = await session.executeWrite(tx =>
                tx.run(deleteQuery, { personName })
            );
        
            // Check if the node is deleted
            const checkQuery = `MATCH (p1:Person { name: $personName })
                                RETURN p1`;
        
            const checkResult = await session.executeRead(tx =>
                tx.run(checkQuery, { personName })
            );
        
            expect(checkResult.records.length).toEqual(0);
            } catch (error) {
            console.error(`Something went wrong: ${error}`);
            }finally{
               await session.close();
            }
        }

        await deleteGraph(person1Name);
       await deleteGraph(person2Name);

      });
      

});