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
  onUpdateAspect: (newAspects: Aspect[]) => void;
}

export default function Aspect({ aspect, onUpdateAspect }: AspectProps) {
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
    const updatedAspects = aspectList.map((aspect, i) =>
      i === index ? { ...aspect, name: editText } : aspect
    );
    setAspectList(updatedAspects);
    setEditingIndex(null); // Keluar dari mode edit
    onUpdateAspect(updatedAspects); // Panggil update di sini
  };

  // Hapus aspek
  const handleDeleteAspect = (index: number) => {
    const updatedAspects = aspectList.filter((_, i) => i !== index);
    setAspectList(updatedAspects);
    onUpdateAspect(updatedAspects); // Panggil update di sini
  };

  // Tambah aspek baru
  const handleAddAspect = () => {
    if (newAspect.trim() === "") return;
    const updatedAspects = [...aspectList, { name: newAspect, subaspects: [] }];
    setAspectList(updatedAspects);
    setNewAspect("");
    onUpdateAspect(updatedAspects); // Panggil update di sini
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
          </div>

          <SubAspect
            subaspects={aspect.subaspects}
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
