$snakeName = [regex]::replace($args[0], '(?<=.)(?=[A-Z])', '-').ToLower()
$pascalName = [regex]::replace($args[0].ToLower(), '(^|_|-)(.)', { $args[0].Groups[2].Value.ToUpper()})

mkdir $snakeName
pushd $snakeName
"$snakeName {`n}" | Out-File "$snakeName.scss"
"import './$snakeName.scss';`n`nexport class $pascalName {`n}" | Out-File "$snakeName.ts"
"<template>`n</template>" | Out-File "$snakeName.html"
popd