function addImport(plop){
  return function(content,data){
    const name = plop.getHelper("properCase")(data.name)
    const newEntry = { 
      name,
      raw: `export { default as ${name} } from './${name}';`, 
    }

    const entries = content.split(/\r?\n/).filter(x => x.trim().length).map(entry => {
      return {
        name: entry.match(/{ default as (?<name>.*) }/).groups.name,
        raw: entry,
      }
    })

    entries.push(newEntry);

    return entries.sort((a,b) => {
      if(a.name < b.name){ return -1 }
      if(a.name > b.name){ return 1 }
      return 0
    }).map(entry => entry.raw).join("\n")
  }
}

module.exports = function(plop){
  plop.setGenerator('component',{
    description: "single component file",
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'choose a name for your component'
    }],
    actions: [
      {
        type: 'add',
        path: 'src/{{properCase name}}/index.tsx',
        templateFile: 'templates/component.hbs'
      },
      {
        type: 'add',
        path: 'src/{{properCase name}}/README.md',
        templateFile: 'templates/readme.hbs'
      },
      {
        type: 'modify',
        path: './src/index.ts',
        transform: addImport(plop)
      }
    ]
  })

  plop.setGenerator('component with ref', {
    description: "single component that forwards a ref to a child component",
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'choose a name for your component'
      },
      {
        type: 'input',
        name: 'element',
        message: 'choose the html element for your component (in lowercase)'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{properCase name}}/index.tsx',
        templateFile: 'templates/component-with-ref.hbs'
      },
      {
        type: 'add',
        path: 'src/{{properCase name}}/README.md',
        templateFile: 'templates/readme.hbs'
      },
      {
        type: 'modify',
        path: './src/index.ts',
        transform: addImport(plop)
      }
    ]
  })
}