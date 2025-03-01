import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile.details',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.details.component.html',
  styleUrl: './profile.details.component.css'
})
export class ProfileDetailsComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  
  user: any = {};
  profileForm!: FormGroup;
  editMode = false;
  isLoading = false;
  
  constructor(
    private fb: FormBuilder,
  ) {}

  // ngOnInit(): void {
  //   this.loadUserProfile();
  //   this.initForm();
  // }
  
  // initForm(): void {
  //   this.profileForm = this.fb.group({
  //     fullName: [this.user.fullName || '', [Validators.required]],
  //     email: [this.user.email || '', [Validators.required, Validators.email]],
  //     phone: [this.user.phone || ''],
  //     location: [this.user.location || '']
  //   });
  // }
  
  // loadUserProfile(): void {
  //   this.isLoading = true;
  //   this.userService.getUserProfile().subscribe({
  //     next: (userData) => {
  //       this.user = userData;
  //       this.initForm(); // Reinitialize form with user data
  //       this.isLoading = false;
  //     },
  //     error: (error) => {
  //       this.toastr.error('Failed to load profile data');
  //       this.isLoading = false;
  //     }
  //   });
  // }
  
  openFileSelector(): void {
    this.fileInput.nativeElement.click();
  }
  
  // onFileSelected(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.isLoading = true;
  //     const formData = new FormData();
  //     formData.append('profileImage', file);
      
  //     this.userService.updateProfileImage(formData).subscribe({
  //       next: (response) => {
  //         this.user.profileImage = response.imageUrl;
  //         this.toastr.success('Profile picture updated successfully');
  //         this.isLoading = false;
  //       },
  //       error: (error) => {
  //         this.toastr.error('Failed to update profile picture');
  //         this.isLoading = false;
  //       }
  //     });
  //   }
  // }
  
  // updateProfile(): void {
  //   if (this.profileForm.valid) {
  //     this.isLoading = true;
  //     const updatedData = this.profileForm.value;
      
  //     this.userService.updateProfile(updatedData).subscribe({
  //       next: (response) => {
  //         this.user = { ...this.user, ...updatedData };
  //         this.toastr.success('Profile updated successfully');
  //         this.editMode = false;
  //         this.isLoading = false;
  //       },
  //       error: (error) => {
  //         this.toastr.error('Failed to update profile');
  //         this.isLoading = false;
  //       }
  //     });
  //   }
  // }
  
  // cancelEdit(): void {
  //   this.editMode = false;
  //   this.initForm(); 
  // }
  
  openChangePasswordModal(): void {
    console.log('Open password change modal');
  }
}
