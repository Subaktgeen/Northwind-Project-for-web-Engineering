import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivityService } from './services/activity.service';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css',
  imports: [FormsModule, NgForOf, NgIf],
  providers: [HttpClient] // Providing HttpClient here
})



export class AppComponent implements OnInit {
  activities: any[] = [];
  isNameError = false;
  isNumError  =false;
  newActivity = { activity: '', duration: 0 };

  private activityService = inject(ActivityService);

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities(): void {
    this.activityService.getActivities().subscribe((data) => {
      this.activities = data;
    });
  }

  errorName() {
    const namePattern = /^[a-zA-Z ]+$/;
    if (this.newActivity.activity.length < 3 || !namePattern.test(this.newActivity.activity)) {
      this.isNameError = true;
    } else {
      this.isNameError = false;
    }
  }

  errormin() {
    if (this.newActivity.duration > 0) {
      this.isNumError = false;
    } else {
      this.isNumError = true;
    }
  }



  addActivity(): void {

    this.errorName();
    this.errormin();
    if (!this.isNumError && !this.isNameError) {
      const activityToAdd = {...this.newActivity, date: new Date()};
      this.activityService.addActivity(activityToAdd).subscribe(() => {
        this.newActivity = {activity: '', duration: 0};
        this.loadActivities();
      });
    }
  }

  deleteActivity(id: string): void {
    this.activityService.deleteActivity(id).subscribe(() => {
      this.loadActivities();
    });
  }
}
