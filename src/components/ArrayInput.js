import React, { useRef, useState, useEffect } from "react";

const ArrayInput = () => {
  const functionInputRef = useRef();
  const paramInputRef = useRef();
  const fileInputRef = useRef(undefined);
  var fileString;

  const [timer, setTimer] = useState("Waiting for Function");
  const [userFile, setUserFile] = useState();

  function readingFile() {}

  const submitHandler = () => {
    console.log(paramInputRef.current.value);

    let params = paramInputRef.current.value;
    //params = "([6, 7, 9, 13, 21, 45, 101, 102], 1, l)";

    if (params[0] == "(" && params[params.length - 1] == ")") {
      params = params.slice(1, -1);
      console.log("ran");
    }

    params = params.split(",");
    console.log(params, "< params");
    //console.log(JSON.parse(params)); //need to .parse somehow because going [i] to [i+1] will not keep multi digit numbers. nvm, just .split(',') and go through like that
    let tempBool = false;
    let paramArray = [];
    let miniArray = [];
    for (let i in params) {
      console.log(paramArray);
      let temp = parseFloat(params[i]);
      if (isNaN(temp)) {
        temp = params[i];
      }
      if (params[i][0] == "[") {
        tempBool = true;
        let tempChar = params[i].slice(1, params[i].length);
        tempChar = parseFloat(tempChar);
        if (isNaN(tempChar)) {
          //if undefined
          tempChar = params[i].slice(1, params[i].length);
        }
        miniArray.push(tempChar);
      } else if (params[i][params[i].length - 1] == "]") {
        let tempChar2 = params[i].slice(0, params[i].length - 1);
        tempChar2 = parseFloat(tempChar2);
        console.log(tempChar2, "check 1");
        miniArray.push(tempChar2);
        paramArray.push(miniArray);
        miniArray = [];
        tempBool = false;
      } else if (params[i] !== ",") {
        if (tempBool) {
          miniArray.push(temp);
        } else {
          console.log(temp, "check 2");
          if (isNaN(parseFloat(temp))) {
            paramArray.push(temp.trim());
          } else {
            paramArray.push(temp);
          }
        }
      }
    }
    console.log(paramArray, "<- paramARRAY");

    let x = functionInputRef.current.value;

    let pos1 = x.indexOf("(") + 1;
    let pos2 = x.indexOf(")");
    let param = x.slice(pos1, pos2);

    param = param.split(",");

    console.log(param, "check 3");

    let funcpos1 = x.indexOf("{");
    let funcpos2 = x.length;
    // console.log(x[0], "zzzOOO");
    let rawFunc = x.slice(funcpos1, funcpos2);

    console.log(rawFunc);
    const func = new Function(param, rawFunc);
    //this top one worked assuming just 1 parameter for the array
    //const func = new Function([paramArray], rawFunc);
    //console.log(func(array));
    var startTime = performance.now();

    console.log(
      func.apply(null, paramArray),
      " notice: the array passed to the funciton is not the same the user would input"
    );
    var endTime = performance.now();
    setTimer(endTime - startTime);
  };
  return (
    <div style={{ marginBottom: "25px" }}>
      <p>Upload your JS sorting array</p>
      <p>
        This should only be the sorting function itself. You can upload a .js
        file, or copy + paste the code
      </p>
      <input
        type="file"
        ref={fileInputRef}
        accept=".txt, .js"
        onChange={(e) => {
          console.log(e.target.files[0], "the file @ index 0");
          setUserFile(e.target.files[0]);
        }}
        //not yet implemented
      />
      <textarea
        placeholder="function bubbleSort(array) {
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array.length; j++) {
			if (array[j] > array[j + 1]) {
				let temp = array[j];
				array[j] = array[j + 1];
				array[j + 1] = temp;
			}
		}
	}
	return array;
}"
        ref={functionInputRef}
        style={{ width: "600px", height: "300px" }}
      />
      <p>Enter your parameters</p>
      <br />
      <textarea placeholder="([3,2,1], 1, l)" ref={paramInputRef} />
      <br />
      <button
        style={{ padding: "6px", fontSize: "12pt" }}
        onClick={submitHandler}
      >
        Visualize Sorting
      </button>
      <br />
      {timer} Seconds
      <p>
        Why is my function taking different amounts of time on each run? There
        could be multiple reasons:
        <br />
        1. Your sorting function utilizes randomness
        <br />
        2. Your browser may round the returned time to be less predictable and
        susceptible to security{" "}
        <a
          href="https://en.wikipedia.org/wiki/Spectre_(security_vulnerability)"
          target="_blank"
        >
          threats
        </a>
        <br />
        3. Your system's resources are being used by other things than this
        webpage
      </p>
    </div>
  );
};

export default ArrayInput;
