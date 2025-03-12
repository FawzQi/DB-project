import ConfigBox from "./components/ConfigBox";
import FormTable from "./components/Table";
import { useState } from "react";
import React from "react";

const data = [
  {
    name: "Fruit",
    subaspects: [
      { name: "Apple", value: 1 },
      { name: "Banana", value: 2 },
      { name: "Orange", value: 3 },
    ],
  },
  {
    name: "Vegetables",
    subaspects: [
      { name: "Carrot", value: 3 },
      { name: "Broccoli", value: 4 },
    ],
  },
];

const myData = [
  {
    name: "Project 1",
    aspect: [
      {
        name: "Fruit",
        subaspects: [
          { name: "Apple", value: 1 },
          { name: "Banana", value: 2 },
        ],
      },
      {
        name: "Vegetables",
        subaspects: [
          { name: "Carrot", value: 3 },
          { name: "Broccoli", value: 4 },
        ],
      },
    ],
    scores: [
      { operator: 0, upper: 100, lower: 3, status: "good" },
      { operator: 3, upper: 0, lower: 0, status: "bad" },
    ],
  },
  {
    name: "Project 2",
    aspect: [
      {
        name: "Fruit",
        subaspects: [
          { name: "Apple", value: 1 },
          { name: "Banana", value: 2 },
          { name: "Orange", value: 3 },
        ],
      },
      {
        name: "Vegetables",
        subaspects: [
          { name: "Carrot", value: 3 },
          { name: "Broccoli", value: 4 },
          { name: "Cabbage", value: 5 },
          { name: "Spinach", value: 6 },
        ],
      },
    ],
    scores: [
      { operator: 0, upper: 10, lower: 3, status: "good" },
      { operator: 2, upper: 0, lower: 0, status: "bad" },
    ],
  },
];

interface Subaspect {
  name: string;
  value: number;
}

interface Aspect {
  name: string;
  subaspects: Subaspect[];
}

enum Operator {
  IN_RANGE = 0,
  GREATER_THAN,
  LESS_THAN,
  GREATER_THAN_OR_EQUAL,
  LESS_THAN_OR_EQUAL,
}

interface Score {
  operator: Operator;
  upper: number;
  lower: number;
  status: string;
}

interface FormData {
  name: string;
  aspect: Aspect[];
  scores: Score[];
}

interface FormDataProps {
  formData: FormData;
  index: number;
  updateFormData: (newData: FormData, index: number) => void;
}

export default function App() {
  const [configState, setConfigState] = useState<boolean>(false);
  const [configIndex, setConfigIndex] = useState<number>(0);
  const [formData, setFormData] = useState(myData);
  const updateFormData = (newData: FormData, index: number) => {
    const newFormData = [...formData];
    newFormData[index] = newData;
    setFormData(newFormData);
    setConfigIndex(0);
    setConfigState(false);
  };

  return (
    <>
      {formData.map((data, index) => (
        <React.Fragment key={`${data.name}-${index}`}>
          {configIndex === index && configState ? (
            <ConfigBox
              formData={formData[configIndex]}
              index={configIndex}
              updateFormData={updateFormData}
            />
          ) : (
            <div className="container-lg">
              <button
                onClick={() => {
                  setConfigState(true);
                  setConfigIndex(index);
                }}
              >
                config
              </button>
              <FormTable formData={data} />
            </div>
          )}
        </React.Fragment>
      ))}
    </>
  );
}
