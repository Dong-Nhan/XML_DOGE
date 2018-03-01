//************ Xử lý Thể hiện ***************/
function Tao_Th_Danh_sach_Mat_hang(Danh_sach) {
  
  var Dia_chi_Media = "../Media"
  var Th_Danh_sach = document.createElement("div")
  Th_Danh_sach.className = "row"

  for (var i = 0; i < Danh_sach.getElementsByTagName("Mat_hang").length; i++) {
    var Mat_hang = Danh_sach.getElementsByTagName("Mat_hang")[i]
    var Ten = Mat_hang.getAttribute("Ten")
    var Ma_so = Mat_hang.getAttribute("Ma_so")
    var Don_gia_Ban = parseInt(Mat_hang.getAttribute("Don_gia_Ban"))  
    
    var Th_Hinh = document.createElement("img")
    Th_Hinh.src = `${Dia_chi_Media}/${Ma_so}.png`
    Th_Hinh.style.cssText = `width:150px;height:150px;`

    var Th_Thong_tin = document.createElement("div")
    Th_Thong_tin.className = `btn`
    Th_Thong_tin.style.cssText = `text-align:left`
    Th_Thong_tin.innerHTML = `${Ten}
                    <br />Đơn giá Bán 
                    ${Don_gia_Ban.toLocaleString("vi")}`
    var Th_Mat_hang = document.createElement("div")
    Th_Mat_hang.className = `col-md-3`
    Th_Mat_hang.style.cssText = `margin-bottom:10px`
    Th_Mat_hang.appendChild(Th_Hinh)
    Th_Mat_hang.appendChild(Th_Thong_tin)

    Th_Danh_sach.appendChild(Th_Mat_hang)
  }
  return Th_Danh_sach
}
//************** Xử lý Nghiệp vụ ***********
// Tra cứu với Phiên bản cải tiến 


// ************** Xử lý Lưu trữ *********** 
// PET : Lưu ý Kỹ thuật này đã lạc lậu
// nhưng rất thích hợp khi Giảng dạy mở đầu
function Doc_Danh_sach_Mat_hang() { 
  var Xu_ly_HTTP = new XMLHttpRequest()
  Xu_ly_HTTP.open("GET", "../2-Du_lieu_Luu_tru/Du_lieu.xml", false)
  Xu_ly_HTTP.send("")
  var Chuoi_XML = Xu_ly_HTTP.responseText
  var Du_lieu = new DOMParser().parseFromString(Chuoi_XML, "text/xml").documentElement
  var Danh_sach_Mat_hang=Du_lieu.getElementsByTagName("Danh_sach_Mat_hang")[0]
  return Danh_sach_Mat_hang
}


