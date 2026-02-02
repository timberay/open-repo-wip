import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["icon", "label"]
  static values = {
    text: String,
    successDuration: { type: Number, default: 2000 }
  }

  copy(event) {
    event.preventDefault()
    
    navigator.clipboard.writeText(this.textValue).then(() => {
      this.showSuccess()
    }).catch((error) => {
      console.error("Failed to copy:", error)
    })
  }

  showSuccess() {
    const originalLabel = this.hasLabelTarget ? this.labelTarget.textContent : null
    
    if (this.hasLabelTarget) {
      this.labelTarget.textContent = "Copied!"
    }
    
    if (this.hasIconTarget) {
      this.iconTarget.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
      `
    }

    setTimeout(() => {
      if (this.hasLabelTarget && originalLabel) {
        this.labelTarget.textContent = originalLabel
      }
      
      if (this.hasIconTarget) {
        this.iconTarget.innerHTML = `
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
        `
      }
    }, this.successDurationValue)
  }
}
