export class ModalComponent {
    constructor(page) {
      this.page = page;
      this.modal = '.modal';
      this.closeBtn = '.modal-close';
    }
  
    async close() {
      if (await this.page.locator(this.modal).isVisible()) {
        await this.page.locator(this.closeBtn).click();
      }
    }
  }
  