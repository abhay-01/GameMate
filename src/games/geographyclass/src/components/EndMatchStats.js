import { useContext ,useEffect} from "react";
import { GameContext } from "../context/GameContext";

export default function EndMatchStats() {
  const {
    playerWon,
    matchSilhouettesColumns,
    guessedCountriesCounter,
    failedGuessingAttempts,
    minutes,
    seconds,
  } = useContext(GameContext);

  //useEffect me updateSoloResults wale route ko hit karna hai
  //mujhee iss page see gamemate ke frontend pe redirect hona hai

   
  useEffect(() => {
    // logic for game succes or failure
    const result=guessedCountriesCounter==0?"lose":"win"
    const updateSoloResults = async () => {
      try {
        // The data to be sent in the body of the request
        const data = {
          email: "test@gmail.com",  // Replace with actual player email
          result: result                
        };
        console.log(data)
        // Make a POST request to the backend API using fetch
        const response = await fetch(`${process.env.REACT_APP_API_URL}/updateSoloResults`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        // Check if the response is successful
        if (response.ok) {
          console.log("Match result updated successfully.");

          // Redirect to home page after 3 seconds (3000 milliseconds)
          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        } else {
          // Handle HTTP errors by logging the status and statusText
          console.error(`Failed to update match result: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        // Handle fetch or network errors
        console.error("Error while updating match result:", error);
      }
    };

    // Call the function as soon as the page loads
    updateSoloResults();
  }, []); 

  return (
    <>
      <figure className="endMatchStats">
        <h1>Match Status</h1>
        <div className="individualStat">
          <h1>Guessed countries:</h1>
          <h2>
            {guessedCountriesCounter}/{matchSilhouettesColumns.length}
          </h2>
        </div>
        <div className="individualStat">
          <h1>Failed guessing attempts:</h1>
          <h2>{failedGuessingAttempts}</h2>
        </div>

        {playerWon ? (
          <div className="individualStat">
            <h1>Match duration:</h1>
            <h2>
              <p>
                {minutes}m:{seconds}s
              </p>
            </h2>
          </div>
        ) : null}
      </figure>
    </>
  );
}
