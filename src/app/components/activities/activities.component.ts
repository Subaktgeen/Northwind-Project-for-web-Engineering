// activities.component.ts - Component for displaying and managing activities
import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
  imports: [
    FormsModule
  ],
  standalone: true
})
export class ActivitiesComponent implements OnInit {
  activities: any[] = [];
  newActivity = { activity: '', duration: 0 };

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.loadActivities();
  }

  // Load activities from the backend
  loadActivities(): void {
    this.activityService.getActivities().subscribe((data) => {
      this.activities = data;
    });
  }

  // Add a new activity
  addActivity(): void {
    // Include the current date when adding an activity
    const activityToAdd = { ...this.newActivity, date: new Date() };

    this.activityService.addActivity(activityToAdd).subscribe(() => {
      this.newActivity = { activity: '', duration: 0 }; // Reset the form
      this.loadActivities(); // Refresh the activity list
    });
  }

  // Delete an activity
  deleteActivity(id: string): void {
    this.activityService.deleteActivity(id).subscribe(() => {
      this.loadActivities(); // Refresh the activity list after deletion
    });
  }
}
