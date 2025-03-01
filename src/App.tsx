import ConfigBox from "./components/ConfigBox";
import ScoringTable from "./components/Table";

const data = [
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
];

const formData = [
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
      { operator: 1, value: [1, 3], status: "good" },
      { operator: 3, value: [4], status: "bad" },
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
          { name: "Grape", value: 4 },
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
      { operator: 1, value: [1, 3], status: "good" },
      { operator: 3, value: [4], status: "bad" },
    ],
  },
];

export default function App() {
  // return <ConfigBox />;
  return <ScoringTable formDatas={formData} />;
}
