import Aspect from "./Aspects";
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
  chapter: Chapter[];
  onUpdateChapter: (newChapters: Chapter[]) => void;
}

export default function Chapter({ chapter, onUpdateChapter }: ChapterProps) {
  const [chapterList, setChapterList] = useState<Chapter[]>(chapter);
  const [newChapter, setNewChapter] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  // Mulai edit
  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setEditText(chapterList[index].chapter_name);
  };

  // Simpan perubahan
  const handleSaveEdit = (index: number) => {
    const updatedChapters = chapterList.map((chapter, i) =>
      i === index ? { ...chapter, chapter_name: editText } : chapter
    );
    setChapterList(updatedChapters);
    setEditingIndex(null); // Keluar dari mode edit
    onUpdateChapter(updatedChapters); // Panggil update di sini
  };

  // Hapus chapter
  const handleDeleteChapter = (index: number) => {
    const updatedChapters = chapterList.filter((_, i) => i !== index);
    setChapterList(updatedChapters);
    onUpdateChapter(updatedChapters); // Panggil update di sini
  };

  // Tambah chapter baru
  const handleAddChapter = () => {
    if (newChapter.trim() === "") return; // Cegah penambahan chapter kosong
    /*const newChapterObj: Chapter = {
      no_chapter: chapter.length +1,
      chapter_name: newChapter,
      chapter_weight: 0,
      aspects: [],
    };
    //const updatedChapters = [...chapterList, newChapterObj];
    fetch("http://192.168.86.90:3000/api/projects", {
      mode: "cors",
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"name": newChapter, ""})
    }).then()*/
    //setChapterList(updatedChapters);
    //onUpdateChapter(updatedChapters); // Panggil update di sini
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

          {editingIndex === index && (
            <h5 style={{ textAlign: "left" }}>Edit Chapter Name</h5>
          )}
          <div className="d-flex gap-2 align-items-center">
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  className="form-control"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button
                  className="btn btn-success"
                  onClick={() => handleSaveEdit(index)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h4>Chapter : {chapter.chapter_name}</h4>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEditClick(index)}
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
          <div className="mt-3">
            <Aspect
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
