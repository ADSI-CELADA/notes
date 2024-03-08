import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import Cookies from "universal-cookie"

export const Navbar = () => {

  const cookies = new Cookies

  let name = cookies.get("user")

  const navigate = useNavigate()


  const logOut = async () => {
    let timerInterval
    await Swal.fire({
      title: 'Auto close alert!',
      html: 'I will close in <b></b> milliseconds.',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        cookies.remove("user")
        navigate("/")
      }
    })
  }

  return (
    <>
      <nav>
        <ul>
          <li> <h2> AppNotes </h2> </li>
        </ul>
        <ul>
          {
            name ? <>
              <li> <h3> {name} </h3> </li>
              <li> <h3> <Link to="/FormNotes"> New Task </Link> </h3> </li>
              <li> <h3 onClick={async () => await logOut()}> log out </h3> </li>
            </> : <h1> </h1>
          }
        </ul>
      </nav>
    </>
  )
}
