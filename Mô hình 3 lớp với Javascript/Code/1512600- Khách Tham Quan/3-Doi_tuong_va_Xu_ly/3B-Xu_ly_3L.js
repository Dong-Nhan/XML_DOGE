var xhttp = new XMLHttpRequest()
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		xu_ly_3L(this)
	}
}

xhttp.open('GET', '../2-Du_lieu_Luu_tru/Du_lieu.xml', true)
xhttp.send()

function xu_ly_3L(xml) {
	var xmlDoc = xml.responseXML
	var matHang = xmlDoc.getElementsByTagName('Mat_hang')
	for (var i = 0; i < matHang.length; ++i) {
		var ten = document.createElement('h4')
		ten.innerHTML = matHang[i].attributes.getNamedItem('Ten').nodeValue

		var hinhMinhHoa = document.createElement('img')
		hinhMinhHoa.setAttribute('src', '../Media/' + matHang[i].attributes.getNamedItem('Ma_so').nodeValue + '.png')
		hinhMinhHoa.setAttribute('class', 'blog-img')

		var donGia = document.createElement('h5')
		donGia.innerHTML = matHang[i].attributes.getNamedItem('Don_gia_Ban').nodeValue + ' VND'

		var noiDung = document.createElement('div')
		noiDung.appendChild(ten)
		noiDung.appendChild(donGia)
		
		var sanPham = document.createElement('li')
		if (i % 4 < 2) {
			sanPham.appendChild(hinhMinhHoa)
			sanPham.appendChild(noiDung)
			noiDung.setAttribute('class', 'content-right')
		} else {
			sanPham.appendChild(noiDung)
			sanPham.appendChild(hinhMinhHoa)
			noiDung.setAttribute('class', 'content-left')
		}

		var tenNhomMatHang = matHang[i].getElementsByTagName('Nhom_Mat_hang')[0].attributes.getNamedItem('Ma_so').nodeValue
		if (tenNhomMatHang === 'CA_PHE') {
			document.getElementById('danh-sach-ca-phe').appendChild(sanPham)	
		} else if (tenNhomMatHang === 'MON_AN') {
			document.getElementById('danh-sach-mon-an').appendChild(sanPham)
		}
	}
}