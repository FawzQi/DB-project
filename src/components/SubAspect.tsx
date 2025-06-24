import { useState, useEffect } from "react";

interface Subaspect {
  id: number,
  name: string;
  value: number;
}

interface SubAspectProps {
  parameter_id: number,
  subaspects: Subaspect[];
  onUpdateSubaspects: (newSubaspects: Subaspect[]) => void;
}

const API_BASE_URI: string = import.meta.env.VITE_API_BASE_URI as string

export default function SubAspect({
  parameter_id,
  subaspects,
  onUpdateSubaspects,
}: SubAspectProps) {
  // State untuk menyimpan daftar subkategori
  const [subaspectList, setSubaspectList] = useState<Subaspect[]>(subaspects);
  const [newSubaspect, setNewSubaspect] = useState<string>("");
  const [newSubaspectValue, setNewSubaspectValue] = useState<number>(0);

  // Sinkronisasi state dengan props jika berubah
  useEffect(() => {
    setSubaspectList(subaspects);
  }, [subaspects]);

  // Handle Add Subaspect
  const handleAddSubaspect = () => {
    if (newSubaspect.trim() === "") return; // Cegah input kosong
    const newSubaspectObj = {
      id: 0,
      name: newSubaspect,
      value: newSubaspectValue, // Generate random value
    };
    fetch(`${API_BASE_URI}/api/sub_aspects`, {
      mode: "cors",
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"paramID": parameter_id, "name": newSubaspect})
    }).then()
    setSubaspectList([...subaspectList, newSubaspectObj]);
    setNewSubaspect("");
    setNewSubaspectValue(0); // Reset input value
    onUpdateSubaspects([...subaspectList, newSubaspectObj]);
  };

  // Handle Delete Subaspect
  const handleDeleteSubaspect = (index: number) => {
    const updatedSubaspects = subaspectList.filter((_, i) => i !== index);
    const deletedSubAspectID = subaspects[index].id as unknown
    fetch(`${API_BASE_URI}/api/sub_aspects?`+new URLSearchParams({sub_aspect_id: deletedSubAspectID as string}), {
      mode: "cors",
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
    }).then()
    setSubaspectList(updatedSubaspects);
    onUpdateSubaspects(updatedSubaspects);
  };

  // Handle Update Subaspect Value
  const handleUpdateSubaspectValue = (index: number, value: number) => {
    const updatedSubaspects = [...subaspectList];
    updatedSubaspects[index].value = value;
    const updatedSubAspectID = subaspects[index].id as unknown
    fetch(`${API_BASE_URI}/api/sub_aspects?`+new URLSearchParams({sub_aspect_id: updatedSubAspectID as string}), {
      mode: "cors",
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"mistakes": value})
    }).then()
    setSubaspectList(updatedSubaspects);
    onUpdateSubaspects(updatedSubaspects);
  };

  return (
    <>
      <h4 style={{ textAlign: "left" }}>Sub-Aspek :</h4>
      <div className="col g-2">
        {subaspectList.map((subaspect) => (
          <div key={subaspect.name} className="row align-items-center g-2">
            <div className="col-6">
              <div className="p-2 border rounded bg-light">
                {subaspect.name}
              </div>
            </div>
            <div className="col-2">Total kesalahan:</div>
            <div className="col-2">
              <input
                type="number"
                min={0}
                className="form-control w-10"
                placeholder="Jumlah kesalahan"
                value={subaspect.value}
                onChange={(e) =>
                  handleUpdateSubaspectValue(
                    subaspectList.indexOf(subaspect),
                    parseInt(e.target.value)
                  )
                }
                onBlur={(e) => {
                  if (e.target.value === "") {
                    handleUpdateSubaspectValue(
                      subaspectList.indexOf(subaspect),
                      0
                    );
                  }
                }}
              />
            </div>
            <div className="col-2">
              <button
                className="btn btn-danger w-100"
                onClick={() => handleDeleteSubaspect(subaspectList.indexOf(subaspect))}
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Input Subkategori */}
      <div className="mb-3 d-flex gap-2">
        <input
          type="text"
          className="form-control w-100"
          placeholder="Nama Sub-Aspek baru"
          value={newSubaspect}
          onChange={(e) => setNewSubaspect(e.target.value)}
        />

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddSubaspect}
        >
          Tambah
        </button>
      </div>
    </>
  );
}
