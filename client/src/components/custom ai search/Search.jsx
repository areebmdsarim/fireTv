import { useState } from "react";
import { GrSearch } from "react-icons/gr";
import "./style.css";
import VoiceRecorderComponent from "./VoiceRecorderComponent";
import ContentDiv from "../DivHavingContentCards/ContentDiv";

const Search = () => {
  const searchData = [
    {
      id: 1,
      title: "IND vs AUS",
      thumbnail:
        "https://cdn.siasat.com/wp-content/uploads/2022/09/2022_9img23_Sep_2022_PTI09_23_2022_000311B-scaled.jpg",
      url: "",
      likes: 123,
      views: 211212,
      cloudinaryID: "2d1y3h4jifkc",
    },
    {
      id: 2,
      title: "Jawan",
      url: "",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwnlt2U3pD1ITusQbCa1LTDj5HjNTqCsvjGA&usqp=CAU",
      likes: 9300,
      views: 343447874,
      cloudinaryID: "he2y3h4jifkc",
    },
    {
      id: 3,
      title: "Carrie",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoky-h1Vay3c3PuWBNffKqgneKRamAe8OPKQ&usqp=CAU",
      url: "",
      likes: 34000,
      views: 999679,
      cloudinaryID: "tday3h4jifkc",
    },
  ];
  const [isSearchData, setIsSearchData] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [responseData, setResponseData] = useState([]);
  const [error, setError] = useState(null);

  const handleMicClick = async () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchText(transcript);
    };

    recognition.start();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/search-msg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchText }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      console.error("Error occurred during API call:", error);
      setError(error);
    }
  };

  return (
    <div className="flex-cloumn">
      <div className="flex-row">
        <form className="flex-row" onSubmit={handleFormSubmit}>
          <VoiceRecorderComponent onSpeechResult={setSearchText} />

          <input
            name="search"
            type="text"
            className="custom-search"
            placeholder="AI powered custom search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="search-btn"
            type="submit"
            style={{ marginLeft: "-60px" }}
          >
            <GrSearch />
          </button>
        </form>
        <div className="response-container">
          {error && <div>Error: {error.message}</div>}
          {/* 
        {responseData?.map((item, index) => (
          <div key={index} className="response-item">
            <p>{JSON.stringify(item)}</p>
          </div>
        )} 
        */}
          {console.log(responseData)}
        </div>
      </div>

      {isSearchData === false ? (
        <div>
          <h1
            style={{
              marginLeft: "250px",
              marginBottom: "-80px",
              marginTop: "30px",
            }}
          >
            Recommended for you
          </h1>
          <ContentDiv contentData={searchData} />
        </div>
      ) : (
        <div>
          <h1
            style={{
              marginLeft: "250px",
              marginBottom: "-80px",
              marginTop: "30px",
            }}
          >
            Search Results
          </h1>
          <ContentDiv contentData={searchData} />
        </div>
      )}
    </div>
  );
};

export default Search;
