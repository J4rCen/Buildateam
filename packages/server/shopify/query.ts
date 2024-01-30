const query = `
{
    shop {
      products(first: 50) {
        edges {
          node {
            id
            bodyHtml
            images(first: 50) {
              nodes {
                src
              }
            }
          }
        }
      }
    }
}
`

export default query