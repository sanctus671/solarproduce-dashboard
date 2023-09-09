import {Component, ElementRef, ViewChild, Inject, OnInit} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormBuilder} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {UserService} from '../../services/user/user.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface Project {
  name: string;
  description: string;
}

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})


export class CreateUserComponent  implements OnInit{
    public user: any;
    public newUser: any;

    public separatorKeysCodes: number[] = [ENTER, COMMA];
    public projectCtrl = new FormControl('');
    public filteredProjects: Observable<Project[]>;
    public projects: Array<Project> = [];
    public selectableProjects: Array<Project> = [];

    @ViewChild('projectInput') projectInput: ElementRef<HTMLInputElement>;

    constructor(public dialogRef: MatDialogRef<CreateUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any,    
                private snackBar: MatSnackBar, private userService: UserService, public auth: AuthenticationService ) {
                
        this.newUser = {};

        this.user = {};
        this.auth.getUserData().toPromise().then((data: any) => {
            this.user = data;
            
            if (this.user.projects && this.user.projects.length > 0){
                this.selectableProjects = [...this.user.projects];
                
                this.filteredProjects = this.projectCtrl.valueChanges.pipe(
                    startWith(null),
                    map((project: any | null) => (project ? this._filterProjects(project) : this.selectableProjects.slice()))
                );
                
            }
        });

        this.selectableProjects = [
            { name: 'My Project', description: 'My Project description' },
            { name: 'My Project 2', description: 'My Project description' },
            { name: 'My Project 3', description: 'My Project description' },
            { name: 'My Project 4', description: 'My Project description' },
            { name: 'My Project 5', description: 'My Project description' }
        ];

        this.filteredProjects = this.projectCtrl.valueChanges.pipe(
            startWith(null),
            map((project: any | null) => (project ? this._filterProjects(project) : this.selectableProjects.slice()))
        );
    }

    ngOnInit() {}
    
    
    public saveUser(){
        
        this.newUser["projects"] = this.projects;
        
        this.dialogRef.close({user: this.newUser});
        
        
    }

    public addProject(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        // Add our project
        if (value) {
            const selectedProject = this.selectableProjects.find(project => project.name === value);

            if (selectedProject) {
                this.projects.push(selectedProject);
                this.removeSelectableProject(selectedProject);
            }
        }

        // Clear the input value
        event.chipInput!.clear();

        this.projectCtrl.setValue(null);
    }

    public removeProject(project: Project): void {
        const index = this.projects.indexOf(project);

        if (index >= 0) {
            this.projects.splice(index, 1);
            this.selectableProjects.push(project);
            this.filteredProjects = this.projectCtrl.valueChanges.pipe(
                startWith(null),
                map((project: string | null) => (project ? this._filterProjects(project) : this.selectableProjects.slice()))
            );
        }
    }

    public selectedProject(event: MatAutocompleteSelectedEvent): void {
        const selectedProject = this.selectableProjects.find(project => project.name === event.option.value.name);

        if (selectedProject) {
            this.projects.push(selectedProject);
            this.removeSelectableProject(selectedProject);
            this.filteredProjects = this.projectCtrl.valueChanges.pipe(
                startWith(null),
                map((project: string | null) => (project ? this._filterProjects(project) : this.selectableProjects.slice()))
            );
        }

        this.projectInput.nativeElement.value = '';
        this.projectCtrl.setValue(null);
    }

    private _filterProjects(value: any): Project[] {
        console.log(value);
        const filterValue = value.toLowerCase();

        return this.selectableProjects.filter(project => project.name.toLowerCase().includes(filterValue));
    }

    private removeSelectableProject(project: Project): void {
        const index = this.selectableProjects.indexOf(project);

        if (index >= 0) {
            this.selectableProjects.splice(index, 1);
        }
    }
}