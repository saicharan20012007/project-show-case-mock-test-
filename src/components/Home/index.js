import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import ProjectItem from '../ProjectItem'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiStatus = {
  success: 'success',
  failure: 'failure',
  progress: 'progress',
}

class Home extends Component {
  state = {activeId: 'ALL', status: '', projectsList: []}

  componentDidMount() {
    this.getApiData()
  }

  getApiData = async () => {
    const {activeId} = this.state
    this.setState({status: apiStatus.progress})

    const response = await fetch(
      `https://apis.ccbp.in/ps/projects?category=${activeId}`,
    )
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const formattedData = data.projects.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
      }))
      this.setState({projectsList: formattedData})
      this.setState({status: apiStatus.success})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  setVal = event => {
    console.log(event.target.value)
    this.setState({activeId: event.target.value})

    this.getApiData()
  }

  successView = () => {
    const {projectsList} = this.state
    return (
      <ul className="ul-container">
        {projectsList.map(each => (
          <ProjectItem key={each.id} info={each} />
        ))}
      </ul>
    )
  }

  LoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#328af2" height={50} width={50} />
    </div>
  )

  failureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-title">Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="failure-btn" onClick={this.getApiData}>
        Retry
      </button>
    </div>
  )

  finalView = () => {
    const {status} = this.state
    console.log(status)
    switch (status) {
      case apiStatus.success:
        return this.successView()
      case apiStatus.failure:
        return this.failureView()
      case apiStatus.progress:
        return this.LoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-bg-container">
          <select onChange={this.setVal} className="select-btn">
            {categoriesList.map(each => (
              <option value={each.id}>{each.displayText}</option>
            ))}
          </select>
          {this.finalView()}
        </div>
      </>
    )
  }
}

export default Home
