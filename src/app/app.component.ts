import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'NaviLogic-app';

  fileContent1: string | null = null;
  fileContent2: string | null = null;
  comparisonResult: string | null = null;
  showDetails = false;

  /**
   * Handles file upload. Reads the content of the uploaded file and stores it.
   * @param event - The event triggered by the file input change.
   * @param fileNumber - Identifies which file is being uploaded.
   */
  onFileUpload(event: Event, fileNumber: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {

        if (fileNumber === 1) {
          this.fileContent1 = reader.result as string;
        } else if (fileNumber === 2) {
          this.fileContent2 = reader.result as string;
        }
      };
      reader.readAsText(file);
    }
  }

  /**
   * Compares the two files and checks the differences.
   * The differences are stored in comparisonResult.
   */
  compareFiles(): void {
    const differences = this.compareFileContents();
    this.comparisonResult = differences.length
      ? differences.map(diff => `Line ${diff.line}: File1 -> "${diff.file1}", File2 -> "${diff.file2}"`).join('\n')
      : 'Files are identical';
  }

  /**
   * Returns the array of differences between the two files.
   * @returns An array of differences with line number and content from both files.
   */
  getComparisonArray() {
    return this.compareFileContents();
  }

  /**
   * Compares the content of the two files and identifies differences.
   * @returns An array of differences with line number and content from both files.
   */
  private compareFileContents() {
    const differences: { line: number; file1: string; file2: string }[] = [];

    if (this.fileContent1 && this.fileContent2) {
      const lines1 = this.fileContent1.split('\n');
      const lines2 = this.fileContent2.split('\n');
      const maxLength = Math.max(lines1.length, lines2.length);


      for (let i = 0; i < maxLength; i++) {
        const line1 = lines1[i] || '';
        const line2 = lines2[i] || '';
        if (line1 !== line2) {
          differences.push({ line: i + 1, file1: line1, file2: line2 });
        }
      }
    }

    return differences;
  }

  /**
   * Toggles the visibility of detailed comparison results.
   */
  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }
}
