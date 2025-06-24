import AspectF from "./Aspects";
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

interface Chapter {
  id: number,
  no_chapter: number;
  chapter_name: string;
  chapter_weight: number;
  aspects: Aspect[];
}

interface ChapterProps {
  project_id: number,
  chapter: Chapter[];
  onUpdateChapter: (newChapters: Chapter[]) => void;
}

const API_BASE_URI: string = import.meta.env.VITE_API_BASE_URI as string

export default function Chapter({project_id, chapter, onUpdateChapter }: ChapterProps) {
  const [chapterList, setChapterList] = useState<Chapter[]>(chapter);
  const [newChapter, setNewChapter] = useState<string>("");
  const [editingIndexName, setEditingIndexName] = useState<number | null>(null);
  const [editingIndexWeight, setEditingIndexWeight] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [editNum, setEditNum] = useState<string>("")

  // Mulai edit
  const handleEditClickName = (index: number) => {
    setEditingIndexName(index);
    setEditText(chapterList[index].chapter_name);
  };

  const handleEditClickWeight = (index: number) => {
    setEditingIndexWeight(index);
    setEditNum((chapterList[index].chapter_weight as unknown) as string);
  };

  // Simpan perubahan
  const handleSaveEditName = (index: number) => {
    const updatedChapters = chapterList.map((chapter, i) =>
      i === index ? { ...chapter, chapter_name: editText } : chapter
    );
    const updatedChapterID = chapter[index].id as unknown
    const updatedChapterName = editText
    fetch(`${API_BASE_URI}/api/chapters?`+new URLSearchParams({chapter_id: updatedChapterID  as string}), {
      mode: "cors",
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"name": updatedChapterName})
    }).then()
    setChapterList(updatedChapters);
    setEditingIndexName(null); // Keluar dari mode edit
    onUpdateChapter(updatedChapters); // Panggil update di sini
  };

  const handleSaveEditWeight = (index: number) => {
    const updatedChapters = chapterList.map((chapter, i) =>
      i === index ? { ...chapter, chapter_weight: parseInt(editNum) } : chapter
    );
    const updatedChapterID = chapter[index].id as unknown
    const updatedChapterWeight = editNum
    fetch(`${API_BASE_URI}/api/chapters?`+new URLSearchParams({chapter_id: updatedChapterID  as string}), {
      mode: "cors",
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"weight": updatedChapterWeight})
    }).then()
    setChapterList(updatedChapters);
    setEditingIndexWeight(null); // Keluar dari mode edit
    onUpdateChapter(updatedChapters); // Panggil update di sini
  };

  // Hapus chapter
  const handleDeleteChapter = (index: number) => {
    const updatedChapters = chapterList.filter((_, i) => i !== index);
    const deletedChapterID = chapter[index].id as unknown
    fetch(`${API_BASE_URI}/api/chapters?`+new URLSearchParams({chapter_id: deletedChapterID as string}), {
      mode: "cors",
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    }).then()
    setChapterList(updatedChapters);
    onUpdateChapter(updatedChapters); // Panggil update di sini
  };

  // Tambah chapter baru
  const handleAddChapter = () => {
    if (newChapter.trim() === "") return; // Cegah penambahan chapter kosong
    const newChapterObj: Chapter = {
      id: 0,
      no_chapter: chapter.length +1,
      chapter_name: newChapter,
      chapter_weight: 0,
      aspects: [],
    };
    const updatedChapters = [...chapterList, newChapterObj];
    fetch(`${API_BASE_URI}/api/chapters`, {
      mode: "cors",
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"projectID": project_id,"name": newChapter, "weight": 0})
    }).then()
    setChapterList(updatedChapters);
    onUpdateChapter(updatedChapters); // Panggil update di sini
    setNewChapter(""); // Reset input
  };

  return (
    <div>
      <div className="mb-3">
        <h5 style={{ textAlign: "left" }}>Nama Chapter Baru</h5>
        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Chapter Name"
            value={newChapter}
            onChange={(e) => setNewChapter(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleAddChapter}>
            Add Chapter
          </button>
        </div>
      </div>
      {chapterList.map((chapter, index) => (
        <div key={index} className="mb-4">
          <hr className="my-4" />

          {editingIndexName === index && (
            <h5 style={{ textAlign: "left" }}>Edit Chapter Name</h5>
          )}
          <div className="d-flex gap-2 align-items-center">
            {editingIndexName === index ? (
              <>
                <input
                  type="text"
                  className="form-control"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button
                  className="btn btn-success"
                  onClick={() => handleSaveEditName(index)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h4>Chapter : {chapter.chapter_name}</h4>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEditClickName(index)}
                >
                  Edit
                </button>
              </>
            )}
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteChapter(index)}
            >
              Delete
            </button>
          </div>
          <div className="d-flex gap-2 align-items-center">
            {editingIndexWeight === index ? (
              <>
                <input
                  type="number"
                  className="form-control"
                  value={editNum}
                  onChange={(e) => setEditNum(e.target.value)}
                />
                <button
                  className="btn btn-success"
                  onClick={() => handleSaveEditWeight(index)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h4>Bobot Chapter : {chapter.chapter_weight}</h4>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEditClickWeight(index)}
                >
                  Edit
                </button>
              </>
            )}
          </div>
          <div className="mt-3">
            <AspectF
              chapter_id={chapter.id}
              aspect={chapter.aspects}
              onUpdateAspect={(newAspects) => {
                const updatedChapters = chapterList.map((ch, i) =>
                  i === index ? { ...ch, aspects: newAspects } : ch
                );
                setChapterList(updatedChapters);
                onUpdateChapter(updatedChapters);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
