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
  const [newSubaspectValue, setNewSubaspectValue] = useState<number>(0);

  // Sinkronisasi state dengan props jika berubah
  useEffect(() => {
    setSubaspectList(subaspects);
  }, [subaspects]);

  // Handle Add Subaspect
  const handleAddSubaspect = () => {
    if (newSubaspect.trim() === "") return; // Cegah input kosong
    const newSubaspectObj = {
      name: newSubaspect,
      value: newSubaspectValue, // Generate random value
    };
    setSubaspectList([...subaspectList, newSubaspectObj]);
    setNewSubaspect("");
    setNewSubaspectValue(0); // Reset input value
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

  // Handle Update Subaspect Value
  const handleUpdateSubaspectValue = (index: number, value: number) => {
    const updatedSubaspects = [...subaspectList];
    updatedSubaspects[index].value = value;
    setSubaspectList(updatedSubaspects);
    onUpdateSubaspects(updatedSubaspects);
  };

  return (
    <>
      <h4>Sub-Aspek :</h4>
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
