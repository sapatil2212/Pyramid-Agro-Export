# Fix all dynamic route files for Next.js 15 async params
$files = @(
    "src\app\api\about-content\[id]\route.ts",
    "src\app\api\about-features\[id]\route.ts",
    "src\app\api\about-images\[id]\route.ts",
    "src\app\api\certifications\[id]\route.ts",
    "src\app\api\enquiries\[id]\route.ts",
    "src\app\api\hero-images\[id]\route.ts",
    "src\app\api\hero-key-features\[id]\route.ts",
    "src\app\api\home-content\[section]\route.ts",
    "src\app\api\product-previews\[id]\route.ts",
    "src\app\api\products\[id]\route.ts",
    "src\app\api\services\[id]\route.ts",
    "src\app\api\team-members\[id]\route.ts",
    "src\app\api\testimonials\[id]\route.ts"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Fixing $file..."
        $content = Get-Content $file -Raw
        
        # Fix params type declarations
        $content = $content -replace '\{ params \}: \{ params: \{ id: string \} \}', '{ params }: { params: Promise<{ id: string }> }'
        $content = $content -replace '\{ params \}: \{ params: \{ section: string \} \}', '{ params }: { params: Promise<{ section: string }> }'
        $content = $content -replace '\{ params \}: \{ params: \{ slug: string \} \}', '{ params }: { params: Promise<{ slug: string }> }'
        
        # Add await params after function signature (look for try blocks)
        $content = $content -replace '(\) \{\s+try \{\s+)', "`$1`n    const { id } = await params`n"
        $content = $content -replace '(const \{ id \} = await params\s+const \{ id \} = await params)', 'const { id } = await params'
        
        # Replace params.id with id
        $content = $content -replace 'params\.id', 'id'
        $content = $content -replace 'params\.section', 'section'
        $content = $content -replace 'params\.slug', 'slug'
        
        Set-Content $file $content -NoNewline
        Write-Host "Fixed $file" -ForegroundColor Green
    }
}

Write-Host "Done!" -ForegroundColor Cyan
