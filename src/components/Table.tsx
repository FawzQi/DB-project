import "bootstrap/dist/css/bootstrap.min.css";

export default function ScoringTable() {
  return (
    <div className="container mt-4">
      <h4 className="text-center mb-3">LEMBAR PENILAIAN</h4>

      <div className="mb-3 border p-3">
        <strong>Nama Project:</strong>
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Masukkan nama project..."
        />
      </div>

      <table className="table table-bordered text-center">
        <thead className="table-success">
          <tr>
            <th rowSpan={2}>NO</th>
            <th rowSpan={2}>Chapter</th>
            <th colSpan={2}>Penguasaan Materi</th>
            <th colSpan={2}>Celah Keamanan</th>
            <th colSpan={2}>Fitur Utama</th>
            <th colSpan={2}>Fitur Pendukung</th>
          </tr>
          <tr>
            <th>Sub-Aspek</th>
            <th>Jumlah Kesalahan</th>
            <th>Sub-Aspek</th>
            <th>Jumlah Kesalahan</th>
            <th>Sub-Aspek</th>
            <th>Jumlah Kesalahan</th>
            <th>Sub-Aspek</th>
            <th>Jumlah Kesalahan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Materi Basis Data</td>
            <td>-</td>
            <td>a</td>
            <td>Sanitasi</td>
            <td>-</td>
            <td>Create</td>
            <td>-</td>
            <td>Responsive</td>
            <td>-</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Materi Struktur</td>
            <td>-</td>
            <td>b</td>
            <td>Authorization</td>
            <td>-</td>
            <td>Read</td>
            <td>-</td>
            <td>Load Time</td>
            <td>-</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Materi Matematika</td>
            <td>-</td>
            <td>c</td>
            <td>-</td>
            <td>-</td>
            <td>Update</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Materi Lainnya</td>
            <td>-</td>
            <td>d</td>
            <td>-</td>
            <td>-</td>
            <td>Delete</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr className="table-warning">
            <td colSpan={2}>Total Kesalahan</td>
            <td colSpan={2}>V = a+b+c+d</td>
            <td colSpan={2}>W</td>
            <td colSpan={2}>X</td>
            <td colSpan={2}>Y</td>
          </tr>
        </tbody>
      </table>

      <div className="border p-3 mt-3">
        <p>
          <strong>Bobot Chapter:</strong> TOTAL KESALAHAN = V + W + X + Y
        </p>
        <p>
          <strong>Nilai Bobot Chapter:</strong> TOTAL NILAI = 90 - [TOTAL
          KESALAHAN]
        </p>
        <p>
          <strong>Predikat:</strong> <span className="border p-2"></span>
        </p>
        <p>
          <strong>Status:</strong> [LANJUT] [ULANG]
        </p>
      </div>

      <div className="mt-3 row">
        <div className="col-md-6">
          <strong>Catatan Penguji:</strong>
          <textarea className="form-control mt-2" rows={3}></textarea>
        </div>
        <div className="col-md-6 text-end">
          <strong>Tanda Tangan Penguji:</strong>
          <div className="border mt-2 p-4"></div>
        </div>
      </div>
    </div>
  );
}
