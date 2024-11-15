import { Component,inject  } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { SettingsComponent } from '../settings/settings.component';
import { MatButtonModule } from '@angular/material/button';
import { BudgetService } from '../service/budget.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, MatButtonModule, MatToolbarModule,MatIconModule, MenuModule, ButtonModule, MatDialogModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  items: MenuItem[] | undefined;
  ngOnInit() {
    this.items = [
        {
            label: 'Options',
            items: [
                {
                    label: 'Settings',
                    icon: 'pi pi-cog',
                    command: () => {
                      this.openDialog();
                  }
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out'
                }
            ]
        }
    ];
}

readonly dialog = inject(MatDialog);
budgetService: BudgetService = inject(BudgetService)

openDialog() {
  const dialogRef = this.dialog.open(SettingsComponent);

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}
// deleteTest()  {
//   this.budgetService.dummyDelete().subscribe({
//     next: (val) => {
//       console.log('::dummydelete next',val)
//     },
//     error:(error) => {
//       console.log("::dummyDelete error", error)
//     }
//   })
// }


}
