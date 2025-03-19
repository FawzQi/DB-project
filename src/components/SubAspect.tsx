import { useState, useEffect } from "react";

interface Subaspect {
  name: string;
  value: number;
}

interface SubAspectProps {
  subaspects: Subaspect[];
  onUpdateSubaspects: (newSubaspects: Subaspect[]) => void;
}

export default function SubAspect({
  subaspects,
  onUpdateSubaspects,
}: SubAspectProps) {
  // State untuk menyimpan daftar subkategori
  const [subaspectList, setSubaspectList] = useState<Subaspect[]>(subaspects);
  const [newSubaspect, setNewSubaspect] = useState<string>("");

  // Sinkronisasi state dengan props jika berubah
  useEffect(() => {
    setSubaspectList(subaspects);
  }, [subaspects]);

  // Handle Add Subaspect
  const handleAddSubaspect = () => {
    if (newSubaspect.trim() === "") return; // Cegah input kosong
    const newSubaspectObj = {
      name: newSubaspect,
      value: 0, // Generate random value
    };
    setSubaspectList([...subaspectList, newSubaspectObj]);
    setNewSubaspect("");
    onUpdateSubaspects([...subaspectList, newSubaspectObj]);
  };

  // Handle Delete Subaspect
  const handleDeleteSubaspect = (value: string) => {
    const updatedSubaspects: Subaspect[] = [];
    subaspectList.forEach((subaspect) => {
      if (subaspect.name !== value) {
        updatedSubaspects.push(subaspect);
      }
    });
    setSubaspectList(updatedSubaspects);
    onUpdateSubaspects(updatedSubaspects);
  };

  return (
    <>
      <h4>Sub-Aspek :</h4>
      <div className="col g-2">
        {subaspectList.map((subaspect) => (
          <div key={subaspect.name} className="row align-items-center g-2">
            <div className="col">
              <div className="p-2    border rounded bg-light">
                {subaspect.name}
              </div>
            </div>
            <div className="col-auto">
              <button
                className="btn btn-danger "
                onClick={() => handleDeleteSubaspect(subaspect.name)}
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
