import SubAspect from "./SubAspect";
import { useState } from "react";

interface Subaspect {
  name: string;
  value: number;
}

interface Aspect {
  name: string;
  subaspects: Subaspect[];
}

interface AspectProps {
  aspect: Aspect[];
}

export default function Aspect({ aspect }: AspectProps) {
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
    setAspectList((prevAspects) =>
      prevAspects.map((aspect, i) =>
        i === index ? { ...aspect, name: editText } : aspect
      )
    );
    setEditingIndex(null); // Keluar dari mode edit
  };

  // Hapus aspek
  const handleDeleteAspect = (index: number) => {
    setAspectList((prevAspects) => prevAspects.filter((_, i) => i !== index));
  };

  // Tambah aspek baru
  const handleAddAspect = () => {
    if (newAspect.trim() === "") return;
    setAspectList((prevAspects) => [
      ...prevAspects,
      { name: newAspect, subaspects: [] },
    ]);
    setNewAspect("");
  };

  return (
    <>
      <div className="mb-3 d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Tambah Aspek baru"
          value={newAspect}
          onChange={(e) => setNewAspect(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddAspect}>
          Tambah
        </button>
      </div>
      {aspectList.map((aspect, index) => (
        <>
          <div className="py-1"> </div>
          <div key={index} className="mb-4">
            <div className="d-flex align-items-center gap-2">
              {editingIndex === index ? (
                <input
                  type="text"
                  className="form-control"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <h4 className="mb-0">Aspek: {aspect.name}</h4>
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

            <SubAspect subaspects={aspect.subaspects} />
            {/* <div className="mb-4 pb-3 border-bottom"></div> */}
          </div>
        </>
      ))}
    </>
  );
}
