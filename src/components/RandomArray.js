import React, { useState } from "react";

const RandomArray = () => {
  const [rangeChoice, setRangeChoice] = useState(50);
  const randomArray = Array.from({ length: rangeChoice }, () =>
    Math.floor(Math.random() * 50)
  );
  console.log(randomArray);

  var counter = 0;
  let displayArray = randomArray.map((item) => {
    if (counter == randomArray.length - 1) {
      counter++;
      return <p style={{ display: "inline" }}>{item}</p>;
    } else {
      counter++;

      return <p style={{ display: "inline" }}>{item},</p>;
    }
  });

  return (
    <div>
      <form action="/action_page.php">
        <label for="vol">Generate A Random Array (between 0 and 100):</label>
        <input
          type="range"
          id="vol"
          name="vol"
          min="0"
          max="100"
          onChange={(e) => {
            setRangeChoice(e.target.value);
          }}
        />
        <input type="submit" />
      </form>
      [{displayArray}]
    </div>
  );
};

export default RandomArray;
