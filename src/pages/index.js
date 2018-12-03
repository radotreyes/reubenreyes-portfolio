import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import QuadDoors from '../components/QuadDoors'
import Layout from '../components/Layout'
import { rhythm } from '../utils/typography'

import '../styles/style.scss'

class Index extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }

  state = {
    windowIsLandscape: false,
  }

  componentDidMount = () => {
    window.addEventListener(`resize`, this.handleResize)
  }

  componentWillUnmount = () => {
    window.removeEventListener(`resize`, this.handleResize)
  }

  handleResize = () => {
    this.setState({
      windowIsLandscape: window.matchMedia(`(orientation: landscape)`).matches,
    })
  }

  render() {
    const { data, location } = this.props
    const siteDescription = data.site.siteMetadata.description
    const { windowIsLandscape } = this.state

    return (
      <Layout location={location} title="Reuben Reyes">
        <Helmet
          htmlAttributes={{ lang: `en` }}
          meta={[{ name: `description`, content: siteDescription }]}
          title="REUBEN REYES"
        />
        <h3
          style={{
            marginBottom: rhythm(1 / 4),
          }}
        >
          this is my website
        </h3>
        <AniLink swipe direction="left" to="/blog">
          blog
        </AniLink>
        {windowIsLandscape && <QuadDoors />}
      </Layout>
    )
  }
}

export default Index

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
