import { FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

export const footerMenuData = [
  {
    title: "Layanan",
    links: [
      { name: "Struktur Sekolah", path: "/struktur" },
      { name: "Kegiatan Sekolah", path: "/kegiatan" },
      { name: "Fasilitas Sekolah", path: "/profil/fasilitas" },
    ],
  },
  {
    title: "Bantuan",
    links: [
      { name: "Kontak Sekolah", path: "/kontak" },
      { name: "Informasi Sekolah", path: "/informasi" },
    ],
  },
];

export const socialMediaLinks = [
  { icon: <AiFillInstagram />, url: "https://www.instagram.com/paud.cisa/" },
  { icon: <FaTiktok />, url: "https://www.tiktok.com/" },
  { icon: <FaFacebook />, url: "https://www.facebook.com/" },
  {
    icon: <FaYoutube />,
    url: "https://www.youtube.com/channel/UCw4qgXK1ObfYrELbXgF2IuA",
  },
];
