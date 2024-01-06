import './index.css'

const ProjectItem = props => {
  const {info} = props
  const {name, imageUrl} = info

  return (
    <li className="card">
      <img src={imageUrl} alt={name} className="image" />
      <p className="project-name">{name}</p>
    </li>
  )
}

export default ProjectItem
