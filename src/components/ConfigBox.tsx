import Aspect from "./Aspects";
import Scoring from "./Scoring";

const categories = [
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

const scores = [
  { operator: 1, value: [1, 3], status: "good" },
  { operator: 3, value: [4], status: "bad" },
];

export default function ConfigBox() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card shadow-lg p-3">
                <div className="card-body">
                  <h3 className="card-title text-center">Config Form</h3>
                  <div className="py-3"> </div>
                  <Aspect aspect={categories} />
                  <div className="mb-4 pb-3 border-bottom"></div>
                  <Scoring scores={scores} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
