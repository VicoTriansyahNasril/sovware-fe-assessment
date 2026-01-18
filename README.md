# Sovware Edge System - Frontend Assessment

**Live Deployment:** https://sovware-fe-assessment.vercel.app/

Repository ini merupakan solusi teknis untuk **Frontend Developer Assessment**. Aplikasi ini adalah simulasi sederhana dari **Apache NiFi Flow Builder**, yang memungkinkan pengguna untuk membuat diagram alur pemrosesan data secara interaktif menggunakan fitur Drag & Drop pada Canvas.

---

## 🛠️ Tech Stack & Libraries

Proyek ini dibangun menggunakan teknologi modern dan stabil:

- **Core:** React 19 (Library UI utama)
- **Language:** TypeScript (Type-safety)
- **Build Tool:** Vite (Bundler super cepat)
- **UI Framework:** HeroUI (Komponen UI modern based on NextUI)
- **Styling:** Tailwind CSS (Utility-first CSS)
- **Canvas Engine:** React Flow / @xyflow/react (Library untuk node-based UI)
- **State Management:** Zustand (Global state management)
- **Animation:** Framer Motion (Animasi transisi)

---

## ⚙️ Cara Menjalankan Aplikasi (Lokal)

Ikuti langkah-langkah berikut untuk menjalankan proyek di mesin lokal Anda.

### 1. Prasyarat
Pastikan Anda telah menginstal:
- Node.js (Versi v18 atau v20 direkomendasikan)
- NPM (Bawaan Node.js)

### 2. Instalasi
Clone repository ini (atau ekstrak file zip), lalu buka terminal di root folder:

```bash
# Install seluruh dependency
npm install
```

### 3. Jalankan Mode Development
```bash
# Menjalankan server lokal
npm run dev
```

Aplikasi akan berjalan di http://localhost:5173 (atau port lain yang ditampilkan terminal).

## 🐳 Cara Menjalankan dengan Docker

Proyek ini mendukung containerization menggunakan Docker (Multi-stage build) untuk deployment yang lebih ringan menggunakan Nginx.

### 1. Build Image
Pastikan Docker Desktop sudah berjalan, lalu jalankan:

```bash
docker build -t sovware-app .
```

### 2. Jalankan Container
Gunakan perintah berikut untuk menjalankan aplikasi di port 8080 (atau ganti ke port lain jika 8080 penuh).

```bash
# Opsi A: Jalankan di port 8080
docker run -d -p 8080:80 sovware-app

# Opsi B: Jika port 8080 error/penuh, gunakan port 3000
docker run -d -p 3000:80 sovware-app
```
## 📖 Panduan Penggunaan (Test Scenarios)

Berikut adalah panduan untuk menguji fitur-fitur utama sesuai **Test Case** yang diminta.

### 1. Autentikasi (Login)
Sistem menggunakan *Mock Authentication*. Gunakan kredensial berikut:

- **Email:** `admin@sovware.com`
- **Password:** `admin123`

> **Catatan:** Login valid akan mengarahkan ke Dashboard. Login salah akan memunculkan pesan error. Jika token dihapus manual dari LocalStorage (tab Application di DevTools), user akan otomatis logout saat berpindah halaman atau refresh.

### 2. Flow Builder (Drag & Drop via Modal)
Masuk ke menu **Design** (via Dashboard) untuk mengakses Canvas.

- **Add Processor (Drag & Drop):**
  1. Klik tombol **Processor** (ikon CPU) pada toolbar di atas canvas.
  2. Akan muncul Pop-up (Modal) berisi daftar processor.
  3. **Klik tahan (Drag)** salah satu item processor dari dalam modal.
  4. Modal akan otomatis tertutup, arahkan mouse ke area Canvas.
  5. **Lepas (Drop)** mouse. Node baru akan terbentuk di titik tersebut.
  
- **Move Processor:** Klik dan tahan Node di canvas untuk memindahkannya.
- **Delete Processor:** Klik Node, lalu tekan tombol `Delete` atau `Backspace` pada keyboard.

### 3. Koneksi (Connections)
- **Membuat Koneksi:** Tarik garis dari *Handle* (titik bulat) di sisi kanan Node A ke *Handle* sisi kiri Node B.
- **Validasi Koneksi:** Sistem akan menolak jika Anda mencoba menghubungkan Node ke dirinya sendiri (*Self-loop*).
- **Menghapus Koneksi:** Klik garis koneksi, lalu tekan tombol `Delete` atau klik ikon settings pada garis tersebut.

### 4. Publish Design
Tekan tombol **Publish** di toolbar atas (ikon Awan/Upload).

- **Validasi:** Jika Canvas kosong atau ada Node yang tidak terhubung (Orphan), sistem akan menolak Publish dan menampilkan pesan error.
- **Sukses:** Jika valid, modal konfirmasi akan muncul beserta **JSON Preview** struktur data. Konfirmasi akhir akan memunculkan notifikasi sukses.

---

## 🧠 Arsitektur & Keputusan Teknis

Proyek ini dirancang dengan prinsip **Scalability** dan **Maintainability**. Berikut adalah alasan di balik pemilihan struktur dan teknologi:

### 1. Feature-Based Architecture
Alih-alih mengelompokkan file berdasarkan jenisnya (misal: semua `components` di satu folder, semua `hooks` di satu folder), proyek ini menggunakan pendekatan **Feature-based**.
*   **Colocation:** Kode yang berhubungan diletakkan berdekatan. Contoh: Komponen login, hook auth, dan tipe data user semuanya ada di `src/features/auth`.
*   **Isolation:** Memudahkan *refactoring* atau penghapusan fitur tanpa memecah bagian aplikasi lain.
*   **Scalability:** Struktur ini tetap rapi meskipun aplikasi berkembang menjadi sangat besar.

### 2. State Management (Zustand)
Zustand dipilih menggantikan Redux atau Context API karena:
*   **Minimal Boilerplate:** Kode lebih ringkas dan mudah dibaca.
*   **Performance:** Mengurangi *re-render* yang tidak perlu dibandingkan Context API biasa.
*   **Persistence:** Middleware bawaan memudahkan penyimpanan token auth ke `localStorage` secara otomatis (sesuai Test Case 1.1).

### 3. Drag & Drop Strategy (React Flow)
Menggunakan `@xyflow/react` untuk menangani kompleksitas Canvas.
*   **Custom Nodes:** Node dibuat kustom (`CustomNode.tsx`) untuk memisahkan logika UI node dari logika canvas utama.
*   **Event Driven:** Interaksi Drag & Drop dari Modal ke Canvas memanfaatkan native HTML5 Drag and Drop API yang dikombinasikan dengan metode `screenToFlowPosition` untuk akurasi posisi drop.

### 4. Atomic Design Components
Komponen UI dasar (seperti `PrimaryButton`, `FormInput`) dipisahkan di `src/components/ui` agar dapat digunakan kembali (Reusable) dan menjaga konsistensi desain di seluruh aplikasi.

---

## 📂 Struktur Project

Project ini menggunakan pendekatan **Feature-based Architecture** agar mudah dikembangkan:

```text
src/
├── components/         # Komponen UI Shared (Button, Input, Layout)
├── features/           # Logika bisnis dipisah per fitur
│   ├── auth/           # Fitur Login (Form, API Mock, Guards)
│   ├── dashboard/      # Fitur Dashboard (Table, Sidebar)
│   └── flow/           # Fitur Utama (Canvas, Nodes, Logic)
│       ├── components/ # UI Flow (CustomNode, Modal Processor, Controls)
│       ├── data/       # Mock Data Processors
│       ├── hooks/      # Custom Hook (useFlowLogic - Core Logic)
│       └── types/      # TypeScript Interfaces
├── pages/              # Halaman level rute (Login, Dashboard, Design)
├── store/              # Global State (Zustand Auth Store)
└── assets/             # Static assets (Images, Icons)
```
