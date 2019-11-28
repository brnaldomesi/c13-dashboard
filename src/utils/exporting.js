export const downloadCSV = (csv, filename) => {
  let csvFile
  let downloadLink

  // CSV FILE
  csvFile = new Blob([csv], { type: 'text/csv' })

  // Download link
  downloadLink = document.createElement('a')

  // File name
  downloadLink.download = filename

  // We have to create a link to the file
  downloadLink.href = window.URL.createObjectURL(csvFile)

  // Make sure that the link is not displayed
  downloadLink.style.display = 'none'

  // Download!
  downloadLink.click()
}
