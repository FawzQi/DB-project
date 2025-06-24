import SubAspect from "./SubAspect";
import { useState } from "react";

interface Subaspect {
  id: number,
  name: string;
  value: number;
}

interface Aspect {
  id: number,
  name: string,
  totalMistakes: number,
  subaspects: Subaspect[]
}

interface AspectProps {
  chapter_id: number,
  aspect: Aspect[];
  onUpdateAspect: (newAspects: Aspect[]) => void;
}

const API_BASE_URI: string = import.meta.env.VITE_API_BASE_URI as string

export default function AspectF({chapter_id, aspect, onUpdateAspect }: AspectProps) {
  const [aspectList, setAspectList] = useState<Aspect[]>(aspect);
  const [newAspect, setNewAspect] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  // Mulai edit
  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setEditText(aspectList[index].name);
  };

  // Simpan perubahan
  const handleSaveEdit = (index: number) => {
    const updatedAspectID = aspect[index].id as unknown
    fetch(`${API_BASE_URI}/api/grading_parameters?`+new URLSearchParams({parameter_id: updatedAspectID as string}), {
      mode: "cors",
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"name": editText})
    }).then()
    const updatedAspects = aspectList.map((aspect, i) =>
      i === index ? { ...aspect, name: editText } : aspect
    );
    setAspectList(updatedAspects);
    setEditingIndex(null); // Keluar dari mode edit
    onUpdateAspect(updatedAspects); // Panggil update di sini
  };

  // Hapus aspek
  const handleDeleteAspect = (index: number) => {
    const deletedAspectID = aspect[index].id as unknown
    fetch(`${API_BASE_URI}/api/grading_parameters?`+new URLSearchParams({parameter_id: deletedAspectID as string}), {
      mode: "cors",
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
    }).then()
    const updatedAspects = aspectList.filter((_, i) => i !== index);
    setAspectList(updatedAspects);
    onUpdateAspect(updatedAspects); // Panggil update di sini
  };

  // Tambah aspek baru
  const handleAddAspect = () => {
    if (newAspect.trim() === "") return;
    fetch(`${API_BASE_URI}/api/grading_parameters`, {
      mode: "cors",
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"chapterID": chapter_id,"name": newAspect})
    }).then(()=>{fetch(`${API_BASE_URI}/api/grading_parameters/all`, {
        mode: "cors",
        method: "GET"}).
        then((tableData)=>tableData.json())
        .then((data)=>{
          console.log(data);
          const idIndex = data.length-1 || 0
          const updatedAspects = [...aspectList, {
            id: data[idIndex].parameter_id, 
            name: newAspect, subaspects: [], 
            totalMistakes: 0 }];
          setAspectList(updatedAspects);
          setNewAspect("");
          onUpdateAspect(updatedAspects); // Panggil update di sini
        });});
    
  };

  return (
    <>
      <h5 style={{ textAlign: "left" }}>Nama Parameter Baru</h5>
      <div className="mb-3 d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Tambah Parameter baru"
          value={newAspect}
          onChange={(e) => setNewAspect(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddAspect}>
          Tambah
        </button>
      </div>
      {aspectList.map((aspect, index) => (
        <div key={`${aspect.name}-${index}`} className="py-1">
          <div className="mb-4">
            <div className="d-flex align-items-center gap-2">
              {editingIndex === index ? (
                <input
                  type="text"
                  className="form-control"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <h4 className="mb-0">Parameter : {aspect.name}</h4>
              )}

              {editingIndex === index ? (
                <button
                  className="btn btn-success"
                  onClick={() => handleSaveEdit(index)}
                >
                  Simpan
                </button>
              ) : (
                <>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEditClick(index)}
                  >
                    Rename
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteAspect(index)}
                  >
                    Hapus
                  </button>
                </>
              )}
            </div>
          </div>

          <SubAspect
            parameter_id={aspect.id}
            subaspects={aspectList[index].subaspects}
            onUpdateSubaspects={(newSubaspects) => {
              const updatedAspects = aspectList.map((asp, i) =>
                i === index ? { ...asp, subaspects: newSubaspects } : asp
              );
              setAspectList(updatedAspects);
              onUpdateAspect(updatedAspects);
            }}
          />
        </div>
      ))}
    </>
  );
}
